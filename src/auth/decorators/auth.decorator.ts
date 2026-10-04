import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guards";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guards";
import { ROLES } from "../constants/roles.constants";

export const Auth = (...roles: ROLES[]) => {
    roles.push(ROLES.ADMIN);
    return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard,RolesGuard)
)
}