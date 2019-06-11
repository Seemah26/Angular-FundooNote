import { Component, OnInit, Input } from '@angular/core';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/core/model/note';
import { NoteService } from 'src/app/core/services/NoteService/note.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  noteName: string;
  noteDis: string;
}

@Component({
  selector: 'app-thrash',
  templateUrl: './thrash.component.html',
  styleUrls: ['./thrash.component.scss']
})
export class ThrashComponent implements OnInit {
  @Input() products: Note;
  pinnedColor = false;
  trashForm: FormGroup;
  panelOpenState: boolean = false;
  submitted = false;
  constructor(private service: NoteService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }

  public ngOnInit() {
    console.log(this.products);
    this.readAll();
  }
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  title = new FormControl('', [Validators.required, Validators.minLength(1)]);

  public readAll() {
    this.service.getAll().subscribe((products: any) => {
      this.products = products;
    }, (error) => console.log(error));
  }

  public togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  public delete(id) {
    this.service.delete(id);
  }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data:
        { title: note.title, description: note.description, id: note.noteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.onCloseUpdateNote(note);
    });
  }

  public onCloseUpdateNote(note) {
    this.service.updateNote(note, note.noteId);
  }

  public onRestore(products) {
    products.inTrash = false;
    this.service.updateNote(products, products.noteId).subscribe(resp => {
      this.snackBar.open("Successfully restored", "Ok", {
        duration: 2000,
      });
    }, (error) => {
      console.log(error);
    })

  }

  public deletPermanently(note) {
    this.service.delete(note.noteId).subscribe(result => {
      console.log(result);
      this.snackBar.open("Deleted permanently", "Ok", {
        duration: 2000,
      });
    }, (error) => {
      console.log(error);
    });
  }
  public childStatusChanged(finished: boolean) {
    if (finished) {
      this.readAll();
    }
  }

  public transformImage(data) {
    const url = `data:${data.contentType};base64,${data.image}`;
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }
}
