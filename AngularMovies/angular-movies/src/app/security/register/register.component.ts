import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { UserCredentials } from '../security.models';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errors: string[] = [];

  constructor(private securityService: SecurityService,
              private router: Router) { }

  ngOnInit(): void {
  }

    register(userCredentials: UserCredentials){
            // we wan to cleanup after the errors appear
    this.errors = [];
    this.securityService.register(userCredentials).subscribe(authenticationResponse => {
      console.log(authenticationResponse);
      this.securityService.saveToken(authenticationResponse);
      this.router.navigate(['/']);
}, error => this.errors = parseWebAPIErrors(error));
  }
}
