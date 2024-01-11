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
exports.post_model = exports.post_schema = exports.post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let post = class post extends mongoose_2.Document {
};
exports.post = post;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "users", requiredPaths: true }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], post.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], post.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], post.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], post.prototype, "visibility", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], post.prototype, "image", void 0);
exports.post = post = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], post);
exports.post_schema = mongoose_1.SchemaFactory.createForClass(post);
exports.post_model = post.name;
//# sourceMappingURL=post.schema.js.map