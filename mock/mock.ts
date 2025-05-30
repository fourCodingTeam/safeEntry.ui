import invites from "./invites.json";
import motives from "./motivos.json";
import roles from "./roles.json";
import users from "./users.json";

export function getInviteById(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const invite = invites.find((i) => i.id === id);
      resolve(invite);
    }, 500);
  });
}

export function getMotiveById(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const motive = motives.find((m) => m.id === id);
      resolve(motive);
    }, 500);
  });
}

export function getAllMotives() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(motives);
    }, 500);
  });
}

export function getRoleById(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const role = roles.find((r) => r.id === id);
      resolve(role);
    }, 500);
  });
}

export function getAllUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 500);
  });
}

export function getUserById(id: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === id);
      resolve(user);
    }, 500);
  });
}
