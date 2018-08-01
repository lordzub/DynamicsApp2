import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ShowQuesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-show-ques',
  templateUrl: 'show-ques.html',
})
export class ShowQuesPage {
  @ViewChild('myInput') myInput: ElementRef;
public Anss: Array<any> = [];
public NoOfA: Array<any> = [];
public UID: Array<any> = [];
public item:any;
public dbRef:any;
recommendation_document: string;
public myStuff:string;
public Ans:any;
public AnsStudent:any;
 StudentNumber:String;
 Type: String;
 Resolved:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider)
  {
this.item = navParams.get('question');
this.dbRef = navParams.get('key');

console.log(this.item);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowQuesPage');


var itemRef = firebase.database().ref('Answers/Tutorial:'+this.item.Tutno+'/');
    itemRef.on('value', itemSnapshot => {
      this.Anss = [];
      this.NoOfA =[];
      this.UID = [];

      itemSnapshot.forEach( itemSnap => {
      //  var key = itemSnap.key;
      //  this.TutNo.push(itemSnap.key);

        var itemRef = firebase.database().ref('Answers/Tutorial:'+this.item.Tutno+'/Question No: '+this.item.QuesNo);
        itemRef.on('value', Snapshot =>
      {

       Snapshot.forEach( Snap => {
         var key1 = Snap.key;
         //this.QuesNo.push(key1);





         var itemRef = firebase.database().ref('Answers/Tutorial:'+this.item.Tutno+'/Question No: '+this.item.QuesNo+'/'+key1);
         itemRef.on('value', Snapshot =>
       {


        Snapshot.forEach( Snap => {
          var key2 = Snap.key;
          this.UID.push(key2);
          console.log(key2);


          var itemRef = firebase.database().ref('Answers/Tutorial:'+this.item.Tutno+'/Question No: '+this.item.QuesNo+'/'+key1+'/'+key2);
          itemRef.on('value', Snapshot =>
        {




           this.Anss.push(Snapshot.val().Ans);
            this.NoOfA.push(Snapshot.val().StudentNumber);
            console.log(this.NoOfA);
          console.log(this.Anss);



        });




       });
       });

      });
      });
        return false;



      });



    });

//console.log(this.Data.StudentNumber);

this.loaduserdetails();
  }


  onSelectChange()
  {
    firebase.database().ref('Questions/'+this.dbRef).set(
      {
        Resolved: true
      }
    );
  }













  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.StudentNumber = res.StudentNumber;
      this.Type = res.Type;
        console.log(this.StudentNumber);
    })
  }



  sendFeedback(){
    firebase.database().ref('recommendation_document').push({

     Ans: this.recommendation_document,
     StudentNumber: this.StudentNumber
    });
    this.recommendation_document ='';
  }

  deleteQuestion(i)
  {
    firebase.database().ref('Answers/Tutorial:'+this.item.Tutno+'/Question No: '+this.item.QuesNo+'/'+this.StudentNumber+'/'+this.UID[i]).remove();
  }



SendAns()
{

  firebase.database().ref('Answers/Tutorial:'+this.item.Tutno+"/Question No: "+this.item.QuesNo+"/"+this.StudentNumber).push({
   Ans: this.myStuff,
   StudentNumber: this.StudentNumber
  });
  this.myStuff ='';

}



}
