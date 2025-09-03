import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserSettingsDto {

  @IsOptional()  
  @IsBoolean()
  notification?: boolean;

  @IsOptional()
  @IsBoolean()
  smsEnabled?: boolean;
}
