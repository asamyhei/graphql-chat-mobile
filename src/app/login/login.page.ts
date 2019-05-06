import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {AddUserGQL, User} from '../graphql/generated/graphql';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AlertController, IonInput} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private addUserGQL: AddUserGQL,
                private userService: UserService,
                private route: Router,
                private alertController: AlertController) {

    }

    ngOnInit() {
    }


    connect(inputElement: IonInput, inputPassword: IonInput) {
        this.addUserGQL.mutate({name: inputElement.value, password: inputPassword.value})
            .pipe(map(response => response.data.addUser))
            .subscribe((data: User) => {
                if (data != null) {
                    sessionStorage.setItem('userId', data.id);
                    this.userService.userChanged(data);
                    this.route.navigate(['/chat']);
                } else {
                    this.presentAlert();
                }
            });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Erreur',
            message: 'Erreur dans le mot de passe',
            buttons: ['OK']
        });

        await alert.present();
    }

}
