import { Injectable } from '@angular/core';

let CONFIG_KEY_NAME = "config";

@Injectable()
export class ConfigProvider {

  // private config={
  //   showSlide: false,
  //   name: "",
  //   userName: ""
  // }

  constructor() {
    
  }

  getConfigData():any{
    return localStorage.getItem(CONFIG_KEY_NAME);
  }

  setConfigData(showSlide?: boolean, name?: string, userName?: string){
    let config = {
        showSlide: false,
        name: "",
        userName: ""
    }

    if(showSlide){
      config.showSlide = showSlide;
    }

    if(name){
      config.name = name;
    }

    if(userName){
      config.userName = userName;
    }

    localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(config));


  }
}
