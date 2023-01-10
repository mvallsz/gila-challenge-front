import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {NotificationService} from './services/notification.service';
import {NotificationInterface} from './interfaces/notification.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ChannelService} from './services/channel.service';
import {CategoryService} from './services/category.service';
import {CategoryInterface} from './interfaces/category.interface';
import {ChannelInterface} from './interfaces/channel.interface';
import {MessageService} from './services/message.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'GILA Software';
  records!: NotificationInterface[];
  displayedColumns: string[] = ['message', 'user', 'channel', 'deliveryStatus', 'notificationDate'];
  dataSource = new MatTableDataSource<NotificationInterface>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public titleCtrl: FormControl = new FormControl((''), [Validators.required]);
  public textCtrl: FormControl = new FormControl((''), [Validators.required]);
  public categoryCtrl: FormControl = new FormControl((''), [Validators.required]);
  public channelsCtrl: FormControl = new FormControl((''), [Validators.required]);

  categoryList: CategoryInterface[] = [];
  channelList: ChannelInterface[] = [];

  spinner: boolean = false;

  constructor(private notificationService: NotificationService,
              private channelsService: ChannelService,
              private categoriesService: CategoryService,
              private messageService: MessageService,
              ) {
    this.notificationService.getNotificationRecords().subscribe(resp => {
        this.dataSource.data = resp.data;
    });

    this.channelsService.getChannels().subscribe(resp => {
      this.channelList = resp.data;
    });

    this.categoriesService.getCategories().subscribe(resp => {
      this.categoryList = resp.data;
    });
  }
  save(){
    this.spinner = true;
    if( this.titleCtrl.status === "VALID" &&
        this.textCtrl.status === "VALID" &&
        this.categoryCtrl.status === "VALID" &&
        this.channelsCtrl.status === "VALID"
    ) {
      const message:any = {};
      message.title = this.titleCtrl.value;
      message.text = this.textCtrl.value;
      message.category = this.categoryCtrl.value;
      message.channels = this.channelsCtrl.value;
      message.status = 1;

      this.messageService.createMessage(message).subscribe(resp => {

        Swal.fire(resp.msg);
        this.titleCtrl.setValue('');
        this.textCtrl.setValue('');
        this.categoryCtrl.setValue('');
        this.channelsCtrl.setValue('');
        this.spinner = false;

        this.notificationService.getNotificationRecords().subscribe(resp => {
          this.dataSource.data = resp.data;
        });
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all the required fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

  }
}
