import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
  email?: String;
  firstName?: String;
  lastName?: String;
}

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);

export default model<UserInterface>('User', UserSchema);
