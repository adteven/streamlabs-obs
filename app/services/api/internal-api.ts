import { RpcApi } from './rpc-api';
import { IJsonRpcRequest, IJsonRpcResponse } from 'services/api/jsonrpc';
import * as Sentry from '@sentry/browser';

/**
 * Internal SLOBS API for usage inside SLOBS itself
 * This API is using by Child-window, one-offs windows and tests
 */
export class InternalApiService extends RpcApi {
  getResource(resourceId: string) {
    // return the resource instance directly from ServicesManager
    return this.servicesManager.getResource(resourceId);
  }

  /**
   * Adds extra logic for errors handling
   * @override
   */
  protected onErrorsHandler(
    request: IJsonRpcRequest,
    errors: (string | Error)[],
  ): IJsonRpcResponse<any> {
    // the errors for the child-window API are anomaly
    // re-raise error for Raven to log these errors
    Sentry.setExtra('API request', request);
    errors
      .filter(e => e instanceof Error)
      .forEach(e => {
        setTimeout(() => {
          throw e;
        }, 0);
      });

    // we are not going to change the response
    return super.onErrorsHandler(request, errors);
  }
}
