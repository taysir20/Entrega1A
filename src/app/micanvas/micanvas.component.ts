import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import {Motor} from '../milib/engines/motor';
import {Panel} from '../milib/views/panels/panel';
import {Button} from '../milib/views/buttons/button';
import {DataHolder} from '../milib/dataholder/dataholder';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {Actividad1} from './actividad1';

@Component({
  selector: 'app-micanvas',
  templateUrl: './micanvas.component.html',
  styleUrls: ['./micanvas.component.css']
})
export class MicanvasComponent implements OnInit, EventsAdminListener{

    @ViewChild('mcnv') mcnv: ElementRef;
    
    private contexto: CanvasRenderingContext2D;
    private miMotor:Motor;
    private actividad1:Actividad1;

  constructor(private ngZone: NgZone) { 
    
  }

  ngOnInit() {
    DataHolder.instance.initScreenSize();
    EventsAdmin.instance.addListener(this);
    this.mcnv.nativeElement.width=DataHolder.instance.nScreenWidth;
    this.mcnv.nativeElement.height=DataHolder.instance.nScreenHeight;
    this.contexto=this.mcnv.nativeElement.getContext('2d');
    //this.contexto.fillStyle = "rgb(200,0,0)";  
    //this.contexto.fillRect(10, 10, 550, 50);
    this.miMotor=new Motor(this.contexto,this.ngZone);
    this.miMotor.start();
    
    this.actividad1=new Actividad1(this.miMotor);
    //this.crearEscenarioMenu();
  }
  
  /*
  private crearEscenarioMenu():void{
    this.p1=new Panel(this.miMotor,0,0,
      DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
    this.miMotor.setRaiz(this.p1);
    let p2:Panel=new Panel(this.miMotor,40,50,120,100);
    let btn1 = new Button(this.miMotor,30,30,80,80);
    
    this.p1.setColor("#22AD19");
    p2.setColor("#CD1B56");
    
    this.miMotor.addViewToParentView(this.p1,p2);
    this.miMotor.addViewToParentView(p2,btn1);
  }
  */

  screenSizeChanged?(vWidth:number,vHeight:number):void{
    this.mcnv.nativeElement.width=DataHolder.instance.nScreenWidth;
    this.mcnv.nativeElement.height=DataHolder.instance.nScreenHeight;
    //this.p1.setSize(DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
  }

}
