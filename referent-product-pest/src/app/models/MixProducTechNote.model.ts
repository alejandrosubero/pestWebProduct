export interface MixProducTechNote {
    product_id:         number;
    product_title:      string;
    analyses:           Analysis[];
}

export interface Analysis {
    with_product_id:    number;
    with_product_title: string;
    potential_benefits: string[];
    risks_drawbacks:    string[];
    would_it_work:      WouldItWork;
    conclusion:         string;
}

export interface WouldItWork {
    answer:    string;
    rationale: string;
}