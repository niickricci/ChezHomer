let Username = "admin";
let Password = "password";
const serveur_ip = "172.22.149.99"; // Adresse IP du serveur (local)
let Nom = null;
let Prénom = null;
// =====================
function obtenirRessourceJSON(ressource) {
  console.log("username: %s", Username);
  console.log("password: %s", Password);

  let url = new URL(`http://${serveur_ip}:4242/cafehomer/${ressource}`);
  return fetch(url, {
    headers: {
      Authorization: `Basic ${Username}:${Password}`,
    },
  }) // Exécute une requête HTTP GET
    .then((res) => {
      // Lorsque la réponse commence à arriver,
      if (!res.ok) throw new Error(res.status);

      return res.json(); // Retourner un objet "Promise" représentant
      // le contenu de la requête.
      // L'objet Response expose la méthode json et text
      // pour traiter le contenu.
    });
}

function créerRessourceJSON(ressource, resInfo) {
  let url = new URL(`http://${serveur_ip}:4242/cafehomer/${ressource}`);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Username}:${Password}`,
    },
    body: JSON.stringify(resInfo),
  }).then((res) => {
    return { satut: `${res.status}` };
  });
}
function supprimerRessourceJSON(ressource) {
  let url = new URL(`http://${serveur_ip}:4242/cafehomer/${ressource}`);
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Username}:${Password}`,
    },
  }).then((res) => {
    return { satut: `${res.status}` };
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function obtenirAuthenJSON(username, password) {
  Username = username;
  Password = password;
  return obtenirRessourceJSON("authentification").then((res) => {
    console.log("login succès: %s", res);
    Nom = res.nom;
    Prénom = res.prénom;
    return res;
  });
}
export function obtenirMenuJSON() {
  return obtenirRessourceJSON("menu");
}
export function obtenirCommandesJSON() {
  return obtenirRessourceJSON("commandes");
}
export function obtenirUneCommandeJSON(id) {
  return obtenirRessourceJSON(`commandes/${id}`);
}
export function supprimerUneCommandeJSON(id) {
  return supprimerRessourceJSON(`commandes/${id}`);
}
export function placerCommandeJSON(commandeItems) {
  let commandeInfo = {
    nom: Nom,
    prénom: Prénom,
    items: commandeItems,
  };
  return créerRessourceJSON("commandes", commandeInfo);
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
