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
exports.CommentsEntity = void 0;
const typeorm_1 = require("typeorm");
const commonFieldsEntity_1 = require("./commonFieldsEntity");
const userEntity_1 = require("./userEntity");
const postEntity_1 = require("./postEntity");
let CommentsEntity = class CommentsEntity extends commonFieldsEntity_1.CommonFieldsEntity {
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], CommentsEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "dislike", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.UserEntity, (user) => user.comments),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' }),
    __metadata("design:type", userEntity_1.UserEntity)
], CommentsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => postEntity_1.PostEntity, (post) => post.comments),
    (0, typeorm_1.JoinColumn)({ name: 'postId' }),
    __metadata("design:type", postEntity_1.PostEntity)
], CommentsEntity.prototype, "post", void 0);
CommentsEntity = __decorate([
    (0, typeorm_1.Entity)('Comments', { database: 'okten' })
], CommentsEntity);
exports.CommentsEntity = CommentsEntity;
//# sourceMappingURL=commentsEntity.js.map