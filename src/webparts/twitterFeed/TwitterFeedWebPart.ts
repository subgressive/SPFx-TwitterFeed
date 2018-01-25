import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TwitterFeedWebPart.module.scss';
import * as strings from 'TwitterFeedWebPartStrings';

var twttr: any = require('twitter');

export interface ITwitterFeedWebPartProps {
  description: string;
  account: string;
}

export default class TwitterFeedWebPart extends BaseClientSideWebPart<ITwitterFeedWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.twitterFeed }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
            </div>
          </div>
        </div>
      </div>`;

      var html = '<a class="twitter-timeline" href="https://twitter.com/subgressive?ref_src=twsrc%5Etfw">Tweets by subgressive</a>';
      this.domElement.innerHTML = html;
  
      twttr.widgets.load();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('account', {
                  label: strings.AccountFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}