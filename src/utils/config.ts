// export const baseUrl = 'http://10.1.35.75:3000'
export const baseUrl = 'https://wx55.vtoone.com'
export const basePicUrl = `${baseUrl}/wxImg`
export const apiBaseUrl = `${baseUrl}/api`
export const graphqlBaseUrl = `${baseUrl}/graphql`
export const mapKey = 'SFCBZ-RGOWP-GHMDE-V3B7V-ZFJP2-SMBED'
export const wxApi = {
    code2Session: 'https://api.weixin.qq.com/sns/jscode2session'
}

// 默认图片路径
export const defaultPic = {
    // 活动类型默认图片 start
    'ALL': `${basePicUrl}/ALL.jpg`,
    'CIVETI_SER': `${basePicUrl}/CIVETI_SER.jpg`,
    'CONSER_SER': `${basePicUrl}/CONSER_SER.jpg`,
    'CULSPORT_SER': `${basePicUrl}/CULSPORT_SER.jpg`,
    'ENVPRO_SER': `${basePicUrl}/ENVPRO_SER.jpg`,
    'HELPOLDER_SER': `${basePicUrl}/HELPOLDER_SER.jpg`,
    'POVALL_SER': `${basePicUrl}/POVALL_SER.jpg`,
    'SAFEGUARD_SER': `${basePicUrl}/SAFEGUARD_SER.jpg`,
    'YOUNTH_SER': `${basePicUrl}/YOUNTH_SER.jpg`,
    // 活动类型默认图片 end

    // 社区默认图片
    'COMMUNITY_HOME': `${basePicUrl}/COMMUNITY_HOME.jpg`,

    // 商家默认图片
    'SPONSOR_PIC': `${basePicUrl}/SPONSOR_PIC.jpg`,

    // 家庭LOGO默认图片
    'FAMILY_LOGO': `${basePicUrl}/FAMILY_LOGO.jpg`,

    // 团队形象默认图片
    'TEAM_PIC': `${basePicUrl}/TEAM_PIC.jpg`,

    // 团队LOGO默认图片
    'TEAM_LOGO': `${basePicUrl}/TEAM_LOGO.png`,

    // 用户服务协议
    'USER_PROTOCOL': `${basePicUrl}/user_pro.html`,

    // 隐私政策
    'PRIVACY_PILICY': `${basePicUrl}/privacy_policy.html`,

    // 公众号默认图片
    'WEIXIN_OPEN': `${basePicUrl}/WEIXIN_OPEN.jpg`,

    // 小程序默认图片
    'WEIXIN_MINI': `${basePicUrl}/WEIXIN_MINI.jpg`
}