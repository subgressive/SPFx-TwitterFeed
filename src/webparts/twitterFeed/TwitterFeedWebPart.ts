import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TwitterFeedWebPart.module.scss';
import * as strings from 'TwitterFeedWebPartStrings';

var twttr: any = require('twitter');

export interface ITwitterFeedWebPartProps {
  description: string;
  account: string;
  limit: number;
  width: number;
}

export default class TwitterFeedWebPart extends BaseClientSideWebPart<ITwitterFeedWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.twitterFeed }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
          </div>
        </div>
      </div>`;

      var html = '<a class="twitter-timeline" data-chrome="noheader,nofooter" data-tweet-limit="' + this.properties.limit + '" width="' + this.properties.width + '" href="https://twitter.com/'+this.properties.account+'?ref_src=twsrc%5Etfw">Tweets by '+this.properties.account+'</a>';
      this.domElement.innerHTML = html;
  
      twttr.widgets.load();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;  
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('account', {
                  label: strings.AccountFieldLabel
                }),
                PropertyPaneSlider('width', {
                  label: strings.WidthFieldLabel,
                  min: 80,
                  max: 400,
                  step: 10
                }),
                PropertyPaneSlider('limit', {
                  label: strings.LimitFieldLabel,
                  min: 2,
                  max: 20,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
