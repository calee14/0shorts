export type DNRRule = {
    id: number,
    priority: number,
    action: DNRRuleAction, 
    condition: DNRRuleCondition
}

export type DNRRuleAction = { 
    type: string
}
export type DNRRuleCondition = {
    urlFilter: string,
    resourceTypes: string[]
}