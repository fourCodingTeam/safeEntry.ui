import invites from "./invites.json";
import motives from "./motivos.json";

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
