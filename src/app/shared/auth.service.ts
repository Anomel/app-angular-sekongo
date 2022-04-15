import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  user: { name: string; admin: boolean; pwd: string }[] = [
    {name: '', pwd: '', admin: false}
  ];
  users: Array<{name: string, pwd: string, admin: boolean}> = [
    {name: 'sekongo', pwd: 'azerty', admin: true},
    {name: 'sekongo2', pwd: 'azerty', admin: false},
  ];

  constructor() { }

  // @ts-ignore
  logIn(name, pwd) {
    // devrait prendre un login et un password en paramètres...
    for (let i = 0; i < this.users.length; i++ ) {
      // tslint:disable-next-line:triple-equals
      if (this.users[i].name == name && this.users[i].pwd == pwd) {
        this.loggedIn = true;
        this.user[0].name = name;
        this.user[0].pwd = this.users[i].pwd;
        return true;
      }
    }
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin =  new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return isUserAdmin;
    // return this.loggedIn;
  }
}

/*
  const admin = isAdmin(); // si on avait pas de promesse

  isAdmin().then((admin) => {
    console.log("Est un administrateur : " + admin);
  })
*/
