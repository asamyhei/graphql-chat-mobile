import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [

    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'chat', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [AuthGuard]},
    {path: 'conversation', loadChildren: './conversation/conversation.module#ConversationPageModule', canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
