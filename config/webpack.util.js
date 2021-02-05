'use strict';

// path root: /config
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const utility = {}

const targetImagePath = '../assets/enp/front/resource/images/'; // 원본 이미지 ROOT 폴더 경로
const spriteImagePath = '../assets/enp/front/resource/images/sprites/'; // 생성될 스프라이트 이미지 폴더 경로
const spriteSCSSPath = '../assets/common/css/scss/_sprite/'; // 생성될 스프라이트 스타일 폴더 경로
const spriteRefPath = '/assets/enp/front/resource/images/sprites/'; // 생성된 스프라이트 스타일에서 참조할 이미지 경로(EX: background-image:url(spriteRefPath))

utility.createSprite = function(spriteName) {
    var spriteFile = 'sprite_' + spriteName + '.png';
    var spriteStyle = 'sprite_' + spriteName + '.scss';

    var styleTemplateFn = function(data) {
        var spriteSheetImage = data.spritesheet;
        var spriteSheetName = data.spritesheet_info.name;
        var spriteSheetClass = `.spr_${spriteSheetName} {background: url(${data.sprites[0].image});}\n`

        var spriteSheet = `$${spriteSheetImage.name}-width: ${spriteSheetImage.px.width};\n`
            + `$${spriteSheetImage.name}-height: ${spriteSheetImage.px.height};\n`
            + `$${spriteSheetImage.name}-name: '${spriteSheetImage.name}';\n`
            + `$${spriteSheetImage.name}-image: '${spriteSheetImage.escaped_image}';\n`
            + `$${spriteSheetImage.name}: (${spriteSheetImage.px.width}, ${spriteSheetImage.px.height}, '${spriteSheetImage.escaped_image}', '${spriteSheetImage.name}');\n`;

        var perSprite = data.sprites.map(function (obj) {
            var prefixer = `$${spriteSheetName}-${obj.name}`;
            var sprite = `${prefixer}-name: '${obj.name}';\n`
                + `${prefixer}-x: ${obj.px.x};\n`
                + `${prefixer}-y: ${obj.px.y};\n`
                + `${prefixer}-offset_x: ${obj.px.offset_x};\n`
                + `${prefixer}-offset_y: ${obj.px.offset_y};\n`
                + `${prefixer}-width: ${obj.px.width};\n`
                + `${prefixer}-height: ${obj.px.height};\n`
                + `${prefixer}-total_width: ${obj.px.total_width};\n`
                + `${prefixer}-total_height: ${obj.px.total_height};\n`
                + `${prefixer}-image: '${obj.escaped_image}';\n`
                + `${prefixer}: (${obj.px.x}, ${obj.px.y}, ${obj.px.offset_x}, ${obj.px.offset_y}, ${obj.px.width}, ${obj.px.height}, ${obj.px.total_width}, ${obj.px.total_height}, '${obj.escaped_image}', '${obj.name}');\n`;
            return sprite;
        }).join('\n');

        return spriteSheetClass + '\n' + spriteSheet + '\n' + perSprite + '\n';
    };

    return new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, targetImagePath, spriteName),
            glob: 'spr_*.png',
        },
        target: {
            image: path.resolve(__dirname, spriteImagePath, spriteFile),
            css: [
                [
                    path.resolve(__dirname, spriteSCSSPath, spriteStyle),
                    {
                        format: 'spriteStyleTemplate',
                    }
                ],
            ],
        },
        apiOptions: {
            cssImageRef: spriteRefPath + spriteFile,
            spritesheet_info: {
                name: spriteName,
            },
        },
        spritesmithOptions: {
            padding: 10,
        },
        customTemplates: {
            'spriteStyleTemplate': styleTemplateFn,
        },
    });
};

module.exports = utility;
