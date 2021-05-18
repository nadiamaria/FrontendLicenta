import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserItem } from 'src/app/shared/data/dataModel/UserItem';
import { UsersService } from 'src/app/shared/data/UsersService';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public users: UserItem[];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource: UserItem[];
  public adminForm = new FormGroup({});
  public group = {};

  constructor(
    private usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.usersService.findAll().subscribe((users) => {
      this.users = users;
      this.dataSource = this.users;

      for (let user of this.users) {
        this.group['admin_role' + user.id] = new FormControl(user.role);
        if (user.role == 'owner') this.group['admin_role' + user.id].disable();
      }
      this.adminForm = new FormGroup(this.group);
    });
  }

  public saveRole(user: UserItem) {
    console.log(this.adminForm.value['admin_role' + user.id]);
    user.role = this.adminForm.value['admin_role' + user.id];
    this.usersService.update(user).subscribe((users) => {
      // this.openSnackBar(
      //   'Utilizatorul ' + user.name + 'a fost editat cu succes!'
      // );
    });
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
