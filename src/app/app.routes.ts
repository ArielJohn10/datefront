import { Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { MemberEditLeaveGuard } from './members/member-edit/member-edit.leave.guard';

import { MemberDetailResolver } from './members/member-detail/member-detail.resolver';
import { MembersResolver } from './members/members.resolver';
import { MemberEditResolver } from './members/member-edit/member-edit.resolver';
import { LikesResolver } from './likes/likes.resolver';
import { MessagesResolver } from './messages/messages.resolver';

import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members', component: MembersComponent,
        resolve: { usersResolver: MembersResolver } // get data before activating the route. It can be used to avoid using safe navigators "?" in html page
      },{path: 'changepassword', component: ChangePasswordComponent},
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: { userResolver: MemberDetailResolver } // get data before activating the route. It can be used to avoid using safe navigators "?" in html page
      },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { userEditResolver: MemberEditResolver }, // get data before activating the route. It can be used to avoid using safe navigators "?" in html page
        canDeactivate: [MemberEditLeaveGuard]
      },
      { path: 'likes', component: LikesComponent, resolve: { likesResolver: LikesResolver } },
      { path: 'messages', component: MessagesComponent, resolve: { messagesResolver: MessagesResolver } },
      { path: 'admin', component: AdminPanelComponent, data: { roles: ['Admin', 'Moderator'] } },
    ]
  },
  // this one must be underneath the list. It can be used for not found pages as well
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
