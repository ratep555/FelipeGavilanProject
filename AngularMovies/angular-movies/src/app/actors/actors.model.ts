export interface ActorCreationDTO{
    name: string;
    dateOfBirth: Date;
    picture: File;
    biography: string;
}

// we created another clas because when we receive picture from api, it will be string not file
// one class is for create and another for edit
export interface ActorDTO {
    name: string;
    dateOfBirth: Date;
    picture: string;
    biography: string;
}


