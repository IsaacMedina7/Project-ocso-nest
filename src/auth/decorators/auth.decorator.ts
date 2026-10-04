import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guards";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guards";

export const Auth = (...roles: string[]) => {
    roles.push("Admin");
    return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard,RolesGuard)
)
}