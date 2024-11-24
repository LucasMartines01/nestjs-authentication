export default class UserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  roles: string[];
}
