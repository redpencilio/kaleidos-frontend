/* eslint-disable no-duplicate-imports */
import { inject as service } from '@ember/service';
import Service from '@ember/service';
import CONFIG from 'fe-redpencil/utils/config';
import moment from 'moment';
import EmberObject from '@ember/object';
export default class activityService extends Service {
  @service store;
  @service toaster;
  @service intl;

  /**
   * Create a new Translation Activity.
   *
   * @param finalTranslationDate
   * @param mailContent
   * @param pieces
   * @param subcase
   * @returns {Promise<Model|any|Promise>}
   */
  async createNewTranslationActivity(finalTranslationDate, mailContent, pieces, subcase) {
    const creationDatetime = moment().utc()
      .toDate();

    // TranslationType.
    const requestTranslationActivityType = EmberObject.create({
      id: CONFIG.ACTIVITY_TYPES.vertalen.id,
      uri: CONFIG.ACTIVITY_TYPES.vertalen.url,
    });

    // Create activity.
    const translateActivity = this.store.createRecord('activity', {
      startDate: creationDatetime,
      finalTranslationDate,
      mailContent,
      subcase,
      type: requestTranslationActivityType,
      usedPieces: pieces,
    });

    // Persist to db.
    await translateActivity.save();

    // Reload relation.
    await subcase.hasMany('publicationActivities').reload();


    return translateActivity;
  }
}