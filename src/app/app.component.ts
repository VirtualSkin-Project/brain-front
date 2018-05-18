import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  age = 1;
  newPasswordVB='';
  listLimb:Object = null;
  selectedLimb={id:"",password:""};
  newLimb={name:"",ip:"",area:"",sub_area:"",ssh_key:"",id:""}
  idLimbToDelete="";
  LimbToUpdate={id:"", area:""};

  sidenavOpened = true;

  constructor(private http: HttpClient) {}

  public onKeyUp($event: any): void {
  	this.title = $event.target.value;
  }
 
  ngOnInit(){
    this.getListConnectedVL();
  }

  public onChange(event: any): void {
    console.log(event);
  }

  /** 
   * Fonction de changement de mdp de VirtualBrain
   * Necessite le MDP dans le formulaire
  */
  public onSubmitPasswordVB(): void {
    console.log(this.newPasswordVB);

    //sur le VB: http://virtualskin.localhost:8000/brain/password
    this.http.put(
      'http://virtualskin.local:8080/brain/password',
      {
        password: this.newPasswordVB
      },
      { observe: 'response' }
    ).subscribe(data => {
      console.log(data.status);
      console.log(data);
      this.newPasswordVB="";
    });
  }

  /** 
   * Fonction de recuperation de la list de VirtualLimbs
  */
  public getListConnectedVL(): void {
    this.http.get(
      'http://virtualskin.local:8080/limb',
      {observe: 'response'}
    ).subscribe(data => {
      this.listLimb = data.body;
      console.log(data.status);
      console.log(data.body);
    });
    //this.listLimb = data.body;
  }

  /** 
   * Fonction de changement de mdp de VirtualLimbs
   * necessite un ID et MDP dans le formulaire
  */
  public onSubmitPasswordVL(): void {
    var url = "http://virtualskin.local:8080/limb/"+ this.selectedLimb.id +"/password";

    /*   console.log(url);
      console.log(this.selectedLimb.id);
      console.log(this.selectedLimb.password);
    */
    this.http.put(
      url,
      {
        id: this.selectedLimb.id,
        password: this.selectedLimb.password
      },
      { observe: 'response' }
    ).subscribe(data => {
      console.log(data.status);
      console.log(data);
      this.selectedLimb.id = "";
      this.selectedLimb.password = "";
    });
  }

  /** 
   * Fonction d'ajout de virtual limbe,
   * necessite un NOM MDP AREA SUBAREA et SSH dans le formulaire infos
  */
  public onSubmitSubscribeVL(): void {
    var url = "http://virtualskin.local:8080/subscribe/";
    this.http.post(
      url,
      {
        name: this.newLimb.name,
        ip: this.newLimb.ip, 
        area: this.newLimb.area,
        sub_area: this.newLimb.sub_area,
        ssh_key:this.newLimb.ssh_key
      },
      {observe: 'response'}
    ).subscribe(data => {
      console.log(data.status);
      console.log(data);
      /* 
      this.newLimb.name = "";
      this.newLimb.ip = "";
      this.newLimb.area = "";
      this.newLimb.sub_area = "";
      this.newLimb.ssh_key = "";
      */
    })
    console.log("newLimbName: " + this.newLimb.name);
    console.log("newLimbIp: " + this.newLimb.ip);
    console.log("newLimbArea: " + this.newLimb.area);
    console.log("newLimbSubArea: " + this.newLimb.sub_area);
    console.log("newLimbSSHKEY: " + this.newLimb.ssh_key);
    //window.location.reload();
  }

  public onSubmitDeleteVL(): void {
    var url = "http://virtualskin.local:8080/limb/" + this.idLimbToDelete;
    
    this.http.delete(
      url,
      {observe: 'response'}
    ).subscribe(data => {
      console.log(data.status);
      console.log(data);
      console.log(this.idLimbToDelete);
    })
    //window.location.reload();
  }

  public onSubmitChangeAreaVL(): void {
    var url = "http://virtualskin.local:8080/limb/" + this.LimbToUpdate.id;
    console.log(this.LimbToUpdate.id);
    console.log(this.LimbToUpdate.area);
    this.http.put(
      url,
      {
        area: this.LimbToUpdate.area
      },
      {observe: 'response'}
    ).subscribe(data => {
      console.log(data.status);
      console.log(data);
      this.LimbToUpdate.id="";
      this.LimbToUpdate.area="";
    })
    //window.location.reload();
  }

}
