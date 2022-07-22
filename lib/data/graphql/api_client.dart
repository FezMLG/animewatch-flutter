// ignore_for_file: avoid_print

import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLAPIClient {
  GraphQLClient _client() {
    final HttpLink httpLink = HttpLink("https://graphql.anilist.co/");

    /// Policies
    /// - Remove cache
    final policies = Policies(
      fetch: FetchPolicy.networkOnly,
    );

    return GraphQLClient(
      cache: GraphQLCache(
        store: HiveStore(),
      ),
      link: httpLink,
      defaultPolicies: DefaultPolicies(
        watchQuery: policies,
        query: policies,
        mutate: policies,
      ),
    );
  }

  /// Start execute
  Future<QueryResult> execute(String queries) async {
    final WatchQueryOptions options = WatchQueryOptions(
      document: gql(queries),
      pollInterval: const Duration(seconds: 15),
      fetchResults: true,
    );
    return await _client().query(options);
  }

  /// Handle exception
  void handleException(QueryResult queryResult) {
    if (queryResult.exception?.linkException is HttpLinkServerException) {
      HttpLinkServerException httpLink =
          queryResult.exception?.linkException as HttpLinkServerException;
      if (httpLink.parsedResponse?.errors?.isNotEmpty == true) {
        print(
            "::: GraphQL error message log: ${httpLink.parsedResponse?.errors?.first.message}");
      }
      return;
    }
    if (queryResult.exception?.linkException is NetworkException) {
      NetworkException networkException =
          queryResult.exception?.linkException as NetworkException;
      print("::: GraphQL error message log: ${networkException.message}");
      return;
    }
  }
}
