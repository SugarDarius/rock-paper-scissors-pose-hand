import * as React from 'react';
import { Helmet } from 'react-helmet';

export type MetaProps = {
    title: string;
    titleTemplate?: string;
    description?: string;
};

export function Meta(props: React.PropsWithChildren<MetaProps>) {
    const { title, titleTemplate, description, children } = props;

    return (
        <Helmet
            htmlAttributes={{ 
                lang: 'en',
            }}
            title={title}
            titleTemplate={`%s - ${titleTemplate || ''}`}
            meta={[
                {
                    name: 'description',
                    content: description || ''
                },
            ]}
        >
            {children}
        </Helmet>
    );
}