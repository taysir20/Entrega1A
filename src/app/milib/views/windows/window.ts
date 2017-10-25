import {View} from '../view';
import {Motor} from '../../engines/motor';
import {Imagen} from '../imgs/imagen';
import {Button} from '../buttons/button';
import {Panel} from '../panels/panel';
import {Label} from '../labels/label';
import {DataHolder} from '../../dataholder/dataholder';
import {EventsAdmin,EventsAdminListener} from '../../events/eventsadmin';
import {Actividad1} from '../../../micanvas/actividad1';

export class Window extends View{

    private sColor:string=null;
    public btnSalir:Button;
    public actividad1: Actividad1;
    private saveUidCentral:string;
    private saveUidCredits: string;
    private saveUidLabel1: string;
    private saveUidLabel2: string;
    private saveUidLabel3: string;
    private saveUidLabel4: string;

    constructor(vMotor:Motor, vX:number, vY:number, vW:number, vH:number){
        super(vMotor, vX, vY, vW, vH);
        this.btnSalir=new Button(this.motor,DataHolder.instance.nScreenWidth-200,0,200,100);
        this.btnSalir.setImagePath("./assets/imgSalir.png"); 
        this.btnSalir.setTexto(null);   
        this.motor.addViewToParentView(this,this.btnSalir);
        this.blVisible = false;
       this.btnSalir.setListener(this);
    }

    public setColor(vsColor:string):void{
        this.sColor=vsColor;
    }
    
    paint(vctx:CanvasRenderingContext2D){
        
        
    }

    public llamadaAddMouseClickToView(view:View):void{
        EventsAdmin.instance.addMouseClickToView(view);
    }

    public uidCentral(uidImagen:string, uidImgCredits: string, uidLabel1: string, uidlabel2: string, uidlabel3:string, uidlabel4: string):void{
        this.saveUidCentral=uidImagen;
        this.saveUidCredits=uidImgCredits;
        this.saveUidLabel1=uidLabel1;
        this.saveUidLabel2=uidlabel2;
        this.saveUidLabel3=uidlabel3;
        this.saveUidLabel4=uidlabel4;
    }

    
    buttonListenerOnClick?(btn:Button):void{
       
        if(this.btnSalir==btn){
            this.motor.setViewVisibility(this.uid,false);

            this.motor.setViewVisibility(this.saveUidCentral, true);

            this.motor.setViewVisibility(this.saveUidCredits,false);
            this.motor.setViewVisibility(this.saveUidLabel1,false);
            this.motor.setViewVisibility(this.saveUidLabel2,false);
            this.motor.setViewVisibility(this.saveUidLabel3,false);
            this.motor.setViewVisibility(this.saveUidLabel4,false);
          }
        
    }

    



}