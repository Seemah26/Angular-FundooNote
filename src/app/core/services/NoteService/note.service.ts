import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttputilService } from 'src/app/httputil.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes = [];
  titl: null
  descriptio: null
  public API = '//localhost:8080/note/';
  constructor(private httpUtil: HttputilService) {
    this.getHeader();
  }

  public getHeader() {
    var token = localStorage.getItem('token')
    const httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return httpheaders;
  }

  public getAll(): Observable<any> {
    var header = this.getHeader();
    return this.httpUtil.get(this.API + 'retrieve', header);

  }

  public save(note) {
    var header = this.getHeader();
    return this.httpUtil.postWithBody(this.API + 'create', note, header)
  }

  public delete(noteId) {
    var header = this.getHeader();
    return this.httpUtil.delete(this.API + 'delete' + noteId, header);
  }

  // public updateNote(note, noteId) {
  //   var token = localStorage.getItem('token');
  //   return this.httpUtil.put(this.API + 'update', note, {
  //     params: {
  //       noteId: noteId,
  //       token: token
  //     }, observe: 'response'
  //   })
  // }

  public updateNote(note, noteId) {
    var token = localStorage.getItem('token');
    var header = this.getHeader();
    
    return this.httpUtil.put(this.API + 'update', note, header);
  }

  public doCollab(collabUser) {
    var token = localStorage.getItem('token');
    return this.httpUtil.put(this.API + '/add-collabarator/' + token, collabUser, {})
  }

  public removeCollab(collabUser) {
    var token = localStorage.getItem('token');
    return this.httpUtil.put(this.API + '/remove-collabarator/' + token, collabUser, {})
  }

  public uploadNoteImage(fd, noteId) {
    return this.httpUtil.put(this.API+'/uploadFile/' + noteId, fd, {
      reportProgress: true,
      responseType: 'text'
    });
  }

}