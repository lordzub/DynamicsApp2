import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddquestionPage} from '../addquestion/addquestion';
import {ShowQuesPage} from '../show-ques/show-ques';

import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
StudentNumber:string;
StudentType:string;
recommendation_home: string;
public Data: Array<any> = [];
public UID: Array<any> = [];

public itemRef: firebase.database.Reference = firebase.database().ref('/Questions');


  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider) {

  //  this.readData();

  }

  ionViewDidLoad() {
    this.itemRef.on('value', itemSnapshot => {
      this.Data = [];
      this.UID=[];
      itemSnapshot.forEach( itemSnap => {
        var key = itemSnap.key;
      //  this.TutNo.push(itemSnap.key);
        this.UID.push(key);
        //console.log(this.UID);
        var QuestionRef = firebase.database().ref('Questions/'+key+'/');
        QuestionRef.on('value', Snapshot =>
      {
          this.Data.push(Snapshot.val());
          console.log(this.Data);

       Snapshot.forEach( Snap => {
         var key1 = Snap.key;
        // this.QuesNo.push(key1);
      //   console.log(key1);


      //   console.log(this.TutNo);
      });
      });
        return false;



      });


   this.Data.reverse();
   this.UID.reverse();
   console.log('Data'+this.Data);
   console.log('UID'+this.UID);
  });
  this.loaduserdetails();
}


loaduserdetails() {
  this.userservice.getuserdetails().then((res: any) => {
    this.StudentNumber = res.StudentNumber;
    this.StudentType= res.Type;
      console.log(this.StudentNumber);
  })
}
  ionViewWillEnter()
  {


  }

openAdQuestionsPage()
{
  this.navCtrl.push(AddquestionPage);
}
showQuestion(index: number)
{
  //console.log(index);
  //console.log(this.Data[index]);
  this.navCtrl.push(ShowQuesPage, {
    question: this.Data[index],
    key: this.UID[index]
});
}
sendFeedback(){
  firebase.database().ref('recommendation_home').push({

   Ans: this.recommendation_home,
   StudentNumber: this.StudentNumber
  });
  this.recommendation_home ='';
}

deleteQuestion(i)
{
  firebase.database().ref('Questions/'+this.UID[i]).remove();
  console.log("Deleted")
}
}
