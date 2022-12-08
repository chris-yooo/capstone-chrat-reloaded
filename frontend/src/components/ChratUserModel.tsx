import {ProfilePictureModel} from "./ProfilePictureModel";

export type ChratUserModel = {
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: ProfilePictureModel,
}
