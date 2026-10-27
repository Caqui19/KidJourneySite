import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.js";

function validarCadastro(nome, senha, politicaAceita) {
  if (!nome.trim()) {
    throw new Error("Informe seu nome para criar a conta.");
  }

  if (senha.length < 8) {
    const erro = new Error("A senha precisa ter pelo menos 8 caracteres.");
    erro.code = "auth/weak-password";
    throw erro;
  }

  if (!politicaAceita) {
    const erro = new Error("Aceite a Política de Segurança para criar sua conta.");
    erro.code = "terms/not-accepted";
    throw erro;
  }
}

async function apagarConta(usuario) {
  await deleteUser(usuario).catch(() => null);
  await signOut(auth).catch(() => null);
}

async function atualizarNome(usuario, nome) {
  try {
    await updateProfile(usuario, { displayName: nome });
  } catch (erro) {
    console.warn("A conta foi criada, mas o nome não pôde ser atualizado.", erro);
  }
}

export async function cadastrarUsuario({ nome, email, senha, politicaAceita }) {
  validarCadastro(nome, senha, politicaAceita);

  const credencial = await createUserWithEmailAndPassword(auth, email, senha);
  const usuario = credencial.user;

  await atualizarNome(usuario, nome);

  try {
    await setDoc(doc(db, "usuarios", usuario.uid), {
      nome: nome.trim(),
      email: usuario.email,
      perfil: "cliente",
      aprovado: false,
      politicaSegurancaAceita: politicaAceita,
      aceitoEm: serverTimestamp(),
    });
  } catch (erro) {
    await apagarConta(usuario);
    throw erro;
  }

  await signOut(auth);

  return usuario;
}

export async function validarPerfil(usuario, perfilEsperado) {
  const referenciaPerfil = doc(db, "usuarios", usuario.uid);
  const perfilSalvo = await getDoc(referenciaPerfil);
  const dados = perfilSalvo.data();

  if (perfilEsperado === "cliente" && (!perfilSalvo.exists() || !dados?.perfil)) {
    await setDoc(
      referenciaPerfil,
      {
        nome: usuario.displayName || "",
        email: usuario.email,
        perfil: "cliente",
        aprovado: false,
      },
      { merge: true },
    );
    return usuario;
  }

  if (perfilEsperado === "cliente" && dados.perfil === "cliente" && dados.aprovado !== false) {
    await setDoc(referenciaPerfil, { aprovado: false }, { merge: true });
    return usuario;
  }

  const parceiroAprovado =
    perfilEsperado !== "parceiro" || dados?.aprovado === true;

  if (!perfilSalvo.exists() || dados?.perfil !== perfilEsperado || !parceiroAprovado) {
    const erro = new Error("Esta conta não tem acesso a esta área.");
    erro.code = "auth/role-not-allowed";
    throw erro;
  }

  return usuario;
}

export function observarUsuario(aoMudar, perfilEsperado) {
  return onAuthStateChanged(auth, async (usuario) => {
    if (!usuario || !perfilEsperado) {
      aoMudar(usuario);
      return;
    }

    try {
      await validarPerfil(usuario, perfilEsperado);
      aoMudar(usuario);
    } catch (erro) {
      aoMudar(null, erro);
      await signOut(auth).catch(() => null);
    }
  });
}

export async function entrarUsuario(email, senha, perfilEsperado) {
  const credencial = await signInWithEmailAndPassword(auth, email, senha);

  try {
    await validarPerfil(credencial.user, perfilEsperado);
    return credencial.user;
  } catch (erro) {
    await signOut(auth).catch(() => null);
    throw erro;
  }
}

export async function sairUsuario() {
  await signOut(auth);
}

export async function redefinirSenha(email) {
  await sendPasswordResetEmail(auth, email);
}
