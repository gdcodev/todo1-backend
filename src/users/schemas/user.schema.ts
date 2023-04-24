import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, required: true, trim: true, minlength: 8 })
  password: string;

  @Prop({
    type: String,
    enum: [Role.Admin, Role.User],
    default: Role.User,
    required: true,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.isModified('password') || user.isNew) {
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
  } else {
    return next();
  }
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
