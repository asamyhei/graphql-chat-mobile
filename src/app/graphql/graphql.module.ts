import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link';

import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';

@NgModule({
    exports: [HttpClientModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
    constructor(apollo: Apollo, private httpClient: HttpClient) {
        const httpLink = new HttpLink(httpClient).create({
            uri: 'http://localhost:8080/graphql',
        });

        const subscriptionLink = new WebSocketLink({
            uri:
                'ws://localhost:8080/graphql',
            options: {
                reconnect: true,
                connectionParams: {
                    authToken: localStorage.getItem('token') || null
                }
            }
        });

        const link = split(
            ({query}) => {
                const {kind, operation} = getMainDefinition(query);
                return kind === 'OperationDefinition' && operation === 'subscription';
            },
            subscriptionLink,
            httpLink
        );

        apollo.create({
            link,
            cache: new InMemoryCache()
        });
    }
}
