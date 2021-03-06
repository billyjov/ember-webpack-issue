import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// import { inject as service } from '@ember/service';
import { LandscapeToken } from 'landscape/services/landscape-token';
import { action } from '@ember/object';
// import AlertifyHandler from 'explorviz-frontend/utils/alertify-handler';
// import Auth from 'explorviz-frontend/services/auth';

interface Args {
  tokens: LandscapeToken[];
  selectToken(token: LandscapeToken): void;
  deleteToken(tokenId: string): Promise<undefined>;
  reload(): void;
}

export default class TokenSelection extends Component<Args> {
  // @service('auth')
  // auth!: Auth;

  @tracked
  sortProperty: keyof LandscapeToken = 'value';

  @tracked
  sortOrder: 'asc' | 'desc' = 'asc';

  @action
  sortBy(property: keyof LandscapeToken) {
    if (property === this.sortProperty) {
      if (this.sortOrder === 'asc') {
        this.sortOrder = 'desc';
      } else {
        this.sortOrder = 'asc';
      }
    } else {
      this.sortOrder = 'asc';
      this.sortProperty = property;
    }
  }

  @action
  // eslint-disable-next-line class-methods-use-this
  onTokenCopied() {
    console.log('Token copied to clipboard');
    // AlertifyHandler.showAlertifySuccess('Token copied to clipboard');
  }
}
