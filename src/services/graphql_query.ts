// gql查询语句示例(供参考)
// 获取专题文章
const gqlArcticle = `query navigationBar($org_id:String, $page:Int, $rows:Int) {
  navigation_bars(org_id:$org_id,page:$page,rows:$rows){
    totalCount
    edges{
      node{
        id title content org_id status pics{ url }
      }
    }
  }
}`

export { gqlArcticle }