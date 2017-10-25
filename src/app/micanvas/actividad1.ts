
import {Panel} from '../milib/views/panels/panel';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Label} from '../milib/views/labels/label';
import {Button, ButtonListener} from '../milib/views/buttons/button';
import {Window} from '../milib/views/windows/window';
export class Actividad1 implements EventsAdminListener, ButtonListener{

    private motor:Motor;
    private panelMenu:Panel;
    private panelJuego:Panel;
    private imagenFondo:Imagen;
    private imgCentral:Imagen;
    public saveUidCentral:string;
    //private e: MouseEvent;
    private btnInicio: Button;
    private btnContinuar: Button;
    private btnSalir: Button;
    private imgZombi: Imagen;
    private imgLogo: Imagen;
    private imgCreditos: Imagen;
    private labelCredit1: Label;
    private labelCredit2: Label;
    private labelCredit3: Label;
    private labelCredit4: Label;
    private windowUno: Window;
    private panelPreguntas: Panel;
    private arrWindows: Array<Window>;
    private btn1: Button;
    private btn2: Button;
    private btn3: Button;
    private btn4: Button;
    private pregunta: Label;
    private arrPreguntas = ["El carbón aparece hasta la capa...", "La caña de azucar crece más rápido en...", "¿Cuánto mide un Enderman?", "¿A quién pertenece en la actualidad Minecraft?"];
    private arrRespuestas= [["64","128","2","Ninguna"],["Arena","Tierra","Ninguna","Agua"],["2 bloques","4 bloques","3 bloques","6 bloques"],["Sony", "Nintendo", "Atari", "Microsoft"]];
    private arrRespCorrectas= [0,2,2,3];
    private indiceRespCorrecta=0;
    private aux;
    private recordarPregunta=0;
    private panelFallo:Panel;
    private numFallos=3;
    private labelRespuesta:Label;
    private imgFallo: Imagen;
    private imgGanar: Imagen;
  

    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/font.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
        this.crearEscenarioJuego();
        
    }

    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
    private crearEscenarioMenu():void{
        
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
        this.imgCentral= new Imagen(this.motor,pmx,pmy,pmw,pmh);
        this.imgCentral.setImg("./assets/imgCentral.jpg");
        this.motor.addViewToParentView(this.imagenFondo,this.imgCentral);
        this.imgZombi= new Imagen(this.motor,0,this.imgCentral.y/12,this.imgCentral.w/2,this.imgCentral.h/1.5);
        this.imgZombi.setImg("./assets/zombi.png");
        this.motor.addViewToParentView(this.imgCentral,this.imgZombi);
       
        this.imgLogo= new Imagen(this.motor,this.imgCentral.x/4,this.imgZombi.h/1.1,this.imgCentral.w/3,this.imgCentral.h/3);
        this.imgLogo.setImg("./assets/MINECRAFT.png");
        this.motor.addViewToParentView(this.imgCentral,this.imgLogo);

        this.imgCreditos= new Imagen(this.motor,this.imgCentral.w/3,-this.imgCentral.y/3,this.imgCentral.w/3,this.imgCentral.h/3);
        this.imgCreditos.setImg("./assets/creditos.png");
        this.imgCreditos.blVisible=false;
        this.motor.addViewToParentView(this.imgCentral,this.imgCreditos);

        this.labelCredit1 = new Label (this.motor,this.imgCentral.w/3,this.imgCentral.y/3,this.imgCentral.w/3,this.imgCentral.h/3);
        this.labelCredit1.setTexto("Framework JS: ANGULAR");
        this.labelCredit1.setFontStyle("25px Minecraft");
        this.labelCredit1.setFontColor("#497925");
        this.labelCredit1.blVisible=false;
        this.motor.addViewToParentView(this.imgCentral,this.labelCredit1);

        this.labelCredit2 = new Label (this.motor,this.imgCentral.w/3,this.labelCredit1.y + 65,this.imgCentral.w/3,this.imgCentral.h/3);
        this.labelCredit2.setTexto("Asignatura: Desarrollo de Interfaces");
        this.labelCredit2.setFontStyle("25px Minecraft");
        this.labelCredit2.setFontColor("#497925");
        this.labelCredit2.blVisible=false;
        this.motor.addViewToParentView(this.imgCentral,this.labelCredit2);

        this.labelCredit3 = new Label (this.motor,this.imgCentral.w/3,this.labelCredit2.y + 65,this.imgCentral.w/3,this.imgCentral.h/3);
        this.labelCredit3.setTexto("Profesor: Jonny");
        this.labelCredit3.setFontStyle("25px Minecraft");
        this.labelCredit3.setFontColor("#497925");
        this.labelCredit3.blVisible=false;
        this.motor.addViewToParentView(this.imgCentral,this.labelCredit3);

        this.labelCredit4 = new Label (this.motor,this.imgCentral.w/3,this.labelCredit3.y + 65,this.imgCentral.w/3,this.imgCentral.h/3);
        this.labelCredit4.setTexto("Alumno: Taysir");
        this.labelCredit4.setFontStyle("25px Minecraft");
        this.labelCredit4.setFontColor("#497925");
        this.labelCredit4.blVisible=false;
        this.motor.addViewToParentView(this.imgCentral,this.labelCredit4);

        this.btnInicio=new Button(this.motor,(this.imgCentral.w/2)+40,30,this.imgCentral.w/3,this.imgCentral.h/6);
        this.btnInicio.setTexto(null);
        this.btnInicio.setImagePath("./assets/COMENZAR.png");
        this.btnInicio.setListener(this);
        this.btnContinuar=new Button(this.motor,(this.imgCentral.w/2)+40,this.btnInicio.y+this.btnInicio.h+30,this.imgCentral.w/3,this.imgCentral.h/6);
        this.btnContinuar.setTexto(null);
        this.btnContinuar.setImagePath("./assets/CONTINUAR.png");
        this.btnContinuar.setListener(this);
        this.btnSalir=new Button(this.motor,(this.imgCentral.w/2)+40,this.btnContinuar.y+this.btnContinuar.h+30,this.imgCentral.w/3,this.imgCentral.h/6);
        this.btnSalir.setTexto(null);
        this.btnSalir.setImagePath("./assets/SALIR.png");
        this.btnSalir.setListener(this);
        this.motor.addViewToParentView(this.imgCentral,this.btnInicio);
        this.motor.addViewToParentView(this.imgCentral,this.btnContinuar);
       this.motor.addViewToParentView(this.imgCentral,this.btnSalir);
       // EventsAdmin.instance.addMouseClickToView(this.btnInicio);
        
       

        /*
        this.labelInicio= new Label(this.motor,this.panelMenu.w/4,30,this.panelMenu.w/2,this.panelMenu.h/4);
        this.labelInicio.setTexto("INICIAR JUEGO");
        this.labelInicio.setFontColor("#B4045F");
        this.labelInicio.setColor("#F7819F");
        this.labelInicio.setTextAttrs("center","middle");
        this.labelContinuar= new Label(this.motor,this.labelInicio.x,this.labelInicio.y+this.labelInicio.h+30,this.panelMenu.w/2,this.panelMenu.h/4);
        this.labelContinuar.setTexto("CONTINUAR JUEGO");
        this.labelContinuar.setFontColor("#B4045F");
        this.labelContinuar.setColor("#F7819F");
        this.labelContinuar.setTextAttrs("center","middle");
        this.labelSalir= new Label(this.motor,this.labelContinuar.x,this.labelContinuar.y+ this.labelContinuar.h+30,this.panelMenu.w/2,this.panelMenu.h/4);
        this.labelSalir.setTexto("SALIR");
        this.labelSalir.setFontColor("#B4045F");
        this.labelSalir.setColor("#F7819F");
        this.labelSalir.setTextAttrs("center","middle");
        this.motor.addViewToParentView(this.panelMenu,this.labelInicio);
        
        this.motor.addViewToParentView(this.panelMenu,this.labelContinuar);
        
        this.motor.addViewToParentView(this.panelMenu,this.labelSalir);

        */
    }

    private crearEscenarioJuego():void{
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);

        this.windowUno = new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.windowUno.setColor("red");
        //this.btnInicio.setViewVisible(this.imgCentral,this.windowUno);
        this.motor.addViewToParentView(this.imagenFondo,this.windowUno);
        
        this.pregunta=new Label(this.motor,this.windowUno.w/2-this.windowUno.w/4,this.windowUno.h/12,this.windowUno.w/2,this.windowUno.h/2.5);
        this.motor.addViewToParentView(this.windowUno,this.pregunta);
        
        this.btn1=new Button(this.motor,60,this.windowUno.h/1.6,this.windowUno.w/5,this.windowUno.h/2.5);
        this.btn1.setTexto(null);
        this.btn1.setImagePath("./assets/btn1.png");
        this.btn1.setListener(this);
        this.motor.addViewToParentView(this.windowUno,this.btn1);

        this.btn2=new Button(this.motor,this.btn1.x+this.btn1.w+60,this.windowUno.h/1.6,this.windowUno.w/5,this.windowUno.h/2.5);
        this.btn2.setTexto(null);
        this.btn2.setImagePath("./assets/btn2.png");
        this.btn2.setListener(this);
        this.motor.addViewToParentView(this.windowUno,this.btn2);

        this.btn3=new Button(this.motor,this.btn2.x+this.btn2.w+60,this.windowUno.h/1.6,this.windowUno.w/5,this.windowUno.h/2.5);
        this.btn3.setTexto(null);
        this.btn3.setImagePath("./assets/btn3.png");
        this.btn3.setListener(this);
        this.motor.addViewToParentView(this.windowUno,this.btn3);

        this.btn4=new Button(this.motor,this.btn3.x+this.btn3.w+60,this.windowUno.h/1.6,this.windowUno.w/5,this.windowUno.h/2.5);
        this.btn4.setTexto(null);
        this.btn4.setImagePath("./assets/btn4.png");
        this.btn4.setListener(this);
        this.motor.addViewToParentView(this.windowUno,this.btn4);
      
        this.panelFallo = new Panel(this.motor,pmx,pmy,pmw,pmh);
        this.panelFallo.setColor("#58392D");
        this.panelFallo.blVisible=false;
       
        
        this.labelRespuesta= new Label(this.motor,this.panelFallo.w/2-this.panelFallo.x/1.3,this.panelFallo.h/1.7-this.panelFallo.y/2,this.panelFallo.w/2,this.panelFallo.h/12);
        this.labelRespuesta.setFontColor("#51882B");
        this.labelRespuesta.setFontStyle("40px Minecraft");
        this.labelRespuesta.blVisible=true;

        this.imgFallo = new Imagen(this.motor,0,this.panelFallo.y/4,this.panelFallo.w/2,this.panelFallo.h/1.2);
        this.imgFallo.setImg("./assets/perdiste.png");
        this.motor.addViewToParentView(this.panelFallo,this.imgFallo);
        this.motor.addViewToParentView(this.panelFallo,this.labelRespuesta);
        this.motor.addViewToParentView(this.imagenFondo,this.panelFallo);

        this.imgGanar= new Imagen(this.motor,pmx,pmy,pmw,pmh);
        this.imgGanar.setImg("./assets/imgGanar.jpg");
        this.imgGanar.blVisible=false;
        this.motor.addViewToParentView(this.imagenFondo,this.imgGanar);
        
        /*
        this.windowUno.llamadaAddMouseClickToView(this.windowUno.btnResp1);
        this.btnInicio.setViewVisible(this.imgCentral,this.windowUno);
        */
        
        
        /*
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
        this.window= new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.window.setImagePath('./assets/font.jpg');
        this.panelPreguntas= new Panel(this.motor,pmx,pmy,pmw,pmh);
        this.panelPreguntas.setColor("blue");
        this.motor.addViewToParentView(this.imgCentral,this.window);
        this.motor.addViewToParentView(this.window,this.panelPreguntas);
        */
    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

      buttonListenerOnClick?(btn:Button):void{

        if(this.btnSalir==btn){
            this.motor.setViewVisibility(this.imgZombi.uid, false);
            this.motor.setViewVisibility(this.imgLogo.uid, false);
  
            this.motor.setViewVisibility(this.btnInicio.uid, false);
            this.motor.setViewVisibility(this.btnContinuar.uid, false);
            this.motor.setViewVisibility(this.btnSalir.uid, false);
          
            this.motor.setViewVisibility(this.imgCreditos.uid, true);
            this.motor.setViewVisibility(this.labelCredit1.uid, true);
            this.motor.setViewVisibility(this.labelCredit2.uid, true);
            this.motor.setViewVisibility(this.labelCredit3.uid, true);
            this.motor.setViewVisibility(this.labelCredit4.uid, true);
          }
         

          
          if(this.btnContinuar==btn && this.pregunta.getTexto()!=null && this.aux<4){
            console.log("aux vale:" +this.aux);
            console.log("recordar pregunta" + this.recordarPregunta);
            
              if(this.recordarPregunta==1){
            
                this.buttonListenerOnClick(this.btnInicio);
                
              } else if(this.recordarPregunta==2){
                this.indiceRespCorrecta--;
                  this.aux--;
                 
                 
                console.log("estoy entrando");
                this.buttonListenerOnClick(this.btn1);
              }else if(this.recordarPregunta==3){
                this.indiceRespCorrecta--;
                this.aux--;
                
                this.buttonListenerOnClick(this.btn3);
                this.indiceRespCorrecta--;
                this.aux--;
              
              }else if(this.recordarPregunta==4){
               
                this.buttonListenerOnClick(this.btn3);
              }
              
              this.motor.setViewVisibility(this.imgCentral.uid, false);
              this.motor.setViewVisibility(this.windowUno.uid, true);
                 
            
            
            
           }



           //////////////////////////////////////////////////////////////

          if(this.btnInicio==btn){
            
             console.log("dentro  de btnInicio");
             console.log("aux vale:" +this.aux);
             console.log("indice respuesta correcta: " + this.indiceRespCorrecta);
 
               this.windowUno.uidCentral(this.imgCentral.uid,this.imgCreditos.uid,this.labelCredit1.uid,this.labelCredit2.uid,this.labelCredit3.uid,this.labelCredit4.uid);
             this.motor.setViewVisibility(this.imgCentral.uid, false);
             this.pregunta.setTexto(this.arrPreguntas[0]);
             this.btn1.setTexto(this.arrRespuestas[0][0]);
             this.btn2.setTexto(this.arrRespuestas[0][1]);
             this.btn3.setTexto(this.arrRespuestas[0][2]);
             this.btn4.setTexto(this.arrRespuestas[0][3]);
             this.motor.setViewVisibility(this.windowUno.uid, true);
             this.indiceRespCorrecta=0;
             this.aux=0;
             this.recordarPregunta=1;
                 
            
            
           }
       

         if(btn==this.btn1){
            if(this.arrRespCorrectas[this.indiceRespCorrecta]==0 && this.aux==0){
                this.pregunta.setTexto(this.arrPreguntas[1]);
                this.btn1.setTexto(this.arrRespuestas[1][0]);
                this.btn2.setTexto(this.arrRespuestas[1][1]);
                this.btn3.setTexto(this.arrRespuestas[1][2]);
                this.btn4.setTexto(this.arrRespuestas[1][3]);
                this.indiceRespCorrecta=1;
                this.aux=1;
                this.recordarPregunta=2;
               
            }

          }


          if(btn==this.btn3){
           console.log("uola");
            if(this.arrRespCorrectas[this.indiceRespCorrecta]==2&& this.aux==1){
                this.pregunta.setTexto(this.arrPreguntas[2]);
                this.btn1.setTexto(this.arrRespuestas[2][0]);
                this.btn2.setTexto(this.arrRespuestas[2][1]);
                this.btn3.setTexto(this.arrRespuestas[2][2]);
                this.btn4.setTexto(this.arrRespuestas[2][3]);
                this.indiceRespCorrecta=2;
                this.aux=2;
                btn=null;
                this.recordarPregunta=3;
               
                
            } 
            if(btn==this.btn3){
                console.log("aux vale:" +this.aux);
                if(this.arrRespCorrectas[this.indiceRespCorrecta]==2 && this.aux==2){
                    this.pregunta.setTexto(this.arrPreguntas[3]);
                    this.btn1.setTexto(this.arrRespuestas[3][0]);
                    this.btn2.setTexto(this.arrRespuestas[3][1]);
                    this.btn3.setTexto(this.arrRespuestas[3][2]);
                    this.btn4.setTexto(this.arrRespuestas[3][3]);
                    this.indiceRespCorrecta=3;
                    this.aux=3;
                    this.recordarPregunta=4;
                    
                }
            
             }  

        }
        if(btn==this.btn4){
            if(this.arrRespCorrectas[this.indiceRespCorrecta]==3 && this.aux==3){
                var aux = this;
                this.motor.setViewVisibility(this.imgGanar.uid,true);
                setTimeout(function() {
                    aux.motor.setViewVisibility(aux.imgGanar.uid, false);
                   aux.motor.setViewVisibility(aux.imgCentral.uid,true);
                   aux.motor.setViewVisibility(aux.windowUno.uid,false);
                   aux.motor.setViewVisibility(aux.imgCreditos.uid, false);
                   aux.motor.setViewVisibility(aux.labelCredit1.uid, false);
                   aux.motor.setViewVisibility(aux.labelCredit2.uid, false);
                   aux.motor.setViewVisibility(aux.labelCredit3.uid, false);
                   aux.motor.setViewVisibility(aux.labelCredit4.uid, false);
                   aux.indiceRespCorrecta=4;
                   aux.aux=4;
                   aux.recordarPregunta=5;
                   console.log(this.recordarPregunta);
                }, 3000);
               

                
            }
       
        }


/*
    if(this.correcta==false && btn!=this.btnInicio && btn!=this.btnContinuar && btn!=this.btnSalir){
            this.numFallos--;
            
                this.mostrarVentanaFallo(this.numFallos);  
            
           
        }
       
 */        
         

      }

      private mostrarVentanaFallo(numFallos: number):void{
          console.log("fallo");
          if(numFallos<0){
            this.numFallos=3;
            this.labelRespuesta.setTexto("¡¡HAS PERDIDO!!");
            this.motor.setViewVisibility(this.panelFallo.uid, true);
            
            
            var aux = this;
            setTimeout(function() {
              aux.motor.setViewVisibility(aux.panelFallo.uid, false);
              aux.motor.setViewVisibility(aux.windowUno.uid, false);
              aux.motor.setViewVisibility(aux.imgCentral.uid, true);

              aux.motor.setViewVisibility(aux.imgCreditos.uid, false);
              aux.motor.setViewVisibility(aux.labelCredit1.uid, false);
              aux.motor.setViewVisibility(aux.labelCredit2.uid, false);
              aux.motor.setViewVisibility(aux.labelCredit3.uid, false);
              aux.motor.setViewVisibility(aux.labelCredit4.uid, false);
              aux.pregunta.setTexto(null);
          }, 3000);



           
          }
          
          
          /*else{
            this.labelRespuesta.setTexto("¡HAS FALLADO! TE QUEDAN: " + this.numFallos +" VIDAS.");
            this.motor.setViewVisibility(this.panelFallo.uid, true);
            var aux = this;
          setTimeout(function() {
            aux.motor.setViewVisibility(aux.panelFallo.uid, false);
        }, 3000);
          }
          */
           
      
         
        
        
         
       
      

      }

}







