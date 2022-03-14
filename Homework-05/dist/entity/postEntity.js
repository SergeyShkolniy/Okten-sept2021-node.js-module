"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
const typeorm_1 = require("typeorm");
const commonFieldsEntity_1 = require("./commonFieldsEntity");
const userEntity_1 = require("./userEntity");
const commentsEntity_1 = require("./commentsEntity");
let PostEntity = class PostEntity extends commonFieldsEntity_1.CommonFieldsEntity {
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], PostEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], PostEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], PostEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.UserEntity, (user) => user.posts),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", userEntity_1.UserEntity)
], PostEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commentsEntity_1.CommentsEntity, (comment) => comment.post),
    __metadata("design:type", Array)
], PostEntity.prototype, "comments", void 0);
PostEntity = __decorate([
    (0, typeorm_1.Entity)('Posts', { database: 'okten' })
], PostEntity);
exports.PostEntity = PostEntity;
//# sourceMappingURL=postEntity.js.map