import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    beforeEach(() => {
        reflector = new Reflector();
        guard = new RolesGuard(reflector);
    });

    const createMockContext = (headers: Record<string, string>, handlerRoles?: string[]): ExecutionContext => {
        const handler = () => {};
        if (handlerRoles) {
            jest.spyOn(reflector, 'get').mockReturnValue(handlerRoles);
        } else {
            jest.spyOn(reflector, 'get').mockReturnValue(undefined);
        }

        return {
            getHandler: () => handler,
            getClass: () => class {},
            switchToHttp: () => ({
                getRequest: () => ({
                    headers,
                }),
            }),
        } as unknown as ExecutionContext;
    };

    it('should return true if no roles are required on the handler', () => {
        const context = createMockContext({}, undefined);
        expect(guard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException if roles are required but no roles header is present', () => {
        const context = createMockContext({}, ['staff']);
        expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if user has insufficient roles', () => {
        const context = createMockContext({ 'x-user-roles': 'student' }, ['staff']);
        expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should return true if user has the required role', () => {
        const context = createMockContext({ 'x-user-roles': 'staff,admin' }, ['staff']);
        expect(guard.canActivate(context)).toBe(true);
    });

    it('should be case-insensitive for role matching', () => {
        const context = createMockContext({ 'x-user-roles': 'STAFF' }, ['staff']);
        expect(guard.canActivate(context)).toBe(true);
    });
});
