import { Collaborator } from './collaborator';
import { Image } from './image';

export interface Note {
     description: string;
     title: string;
     inTrash: boolean;
     isPinned: boolean;
     isArchive: boolean;
     noteId:Number;
     labelList:String[];
     labelName:String;
     colore:String;
     userId:number;
     reminder:string;
     collaboraters:Collaborator[];
     colorMenu:number;
     images:Image[]
}