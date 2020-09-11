/* eslint-disable class-methods-use-this */
import Component from '@glimmer/component';
import { action } from '@ember/object';
// eslint-disable-next-line no-duplicate-imports
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class CompareAgendaList extends Component {
  /**
   * INFO arguments from parent.
   * @agendaToCompare=undefined
   * @currentAgenda type agenda
   * @isShowingChanges=undefined
   */

  @service store;
  @service sessionService;
  @service agendaService;
  @alias('agendaService.addedAgendaitems') addedAgendaitems;

  classNames = ['vlc-scroll-wrapper__body'];

  agendaToCompare = null;
  currentAgenda = null;
  currentAgendaGroups = null;
  agendaToCompareGroups = null;

  @tracked agendaOne = null;
  @tracked agendaTwo = null;
  @tracked isLoadingAgendaOne = null;
  @tracked isLoadingAgendaTwo = null;
  @tracked isLoadingComparison = null;

  @tracked agendaitemsLeft = null;
  @tracked agendaitemsRight = null;
  @tracked combinedAgendaitems = [] ;


  async bothAgendasSelected() {
    if (this.agendaOne && this.agendaTwo) {
      this.isLoadingComparison = true;

      const sortedAgendas = await this.sessionService.currentSession.sortedAgendas;
      const agendaOneIndex = sortedAgendas.indexOf(this.agendaOne);
      const agendaTwoIndex = sortedAgendas.indexOf(this.agendaTwo);

      if (agendaOneIndex < agendaTwoIndex) {
        await this.agendaService.agendaWithChanges(this.agendaOne.get('id'), this.agendaTwo.get('id'));
      } else {
        await this.agendaService.agendaWithChanges(this.agendaTwo.get('id'), this.agendaOne.get('id'));
      }

      this.combinedAgendaitems = await this.createComparisonList(this.agendaitemsLeft, this.agendaitemsRight);
      this.isLoadingComparison = false;
    }
  }


  @action
  async chooseAgendaOne(agenda) {
    this.isLoadingAgendaOne = true;
    const agendaitems = await this.getAgendaitemsFromAgenda(agenda.get('id'));
    await this.agendaService.groupAgendaitemsOnGroupName(agendaitems);

    this.agendaitemsLeft = agendaitems;
    this.agendaOne = agenda;
    this.isLoadingAgendaOne = false;
    await this.bothAgendasSelected();
  }

  @action
  async chooseAgendaTwo(agenda) {
    this.isLoadingAgendaTwo = true;
    const agendaitems = await this.getAgendaitemsFromAgenda(agenda.get('id'));
    await this.agendaService.groupAgendaitemsOnGroupName(agendaitems);

    this.agendaitemsRight = agendaitems;
    this.agendaTwo = agenda;
    this.isLoadingAgendaTwo = false;
    await this.bothAgendasSelected();
  }


  getAgendaitemsFromAgenda(id) {
    return this.store.query('agendaitem', {
      filter: {
        agenda: {
          id,
        },
        'show-as-remark': false,
      },
      sort: 'priority',
      include: 'agenda,agenda-activity,agenda-activity.subcase,mandatees',
    });
  }

  async compareSubcase(left, right) {
    const leftAgendaActivity = await left.get('agendaActivity');
    let leftSubcaseId = null;
    if (leftAgendaActivity) {
      leftSubcaseId = await leftAgendaActivity.get('subcase.id');
    }
    const rightAgendaActivity = await right.get('agendaActivity');
    let rightSubcaseId = null;
    if (rightAgendaActivity) {
      rightSubcaseId = await rightAgendaActivity.get('subcase.id');
    }
    return leftSubcaseId === rightSubcaseId;
  }

  async createComparisonList(leftAgendaitems, rightAgendaitems) {
    leftAgendaitems = [].concat(leftAgendaitems.toArray());
    rightAgendaitems = [].concat(rightAgendaitems.toArray());

    const combinedAgendaitems = [];
    let currentLeft;
    let currentRight;

    while (leftAgendaitems.length || rightAgendaitems.length) {
      if (!currentLeft) {
        currentLeft = leftAgendaitems.shift();
      }
      if (!currentRight) {
        currentRight = rightAgendaitems.shift();
      }

      if (!currentLeft || !currentRight || (await this.compareSubcase(currentLeft, currentRight))) {
        combinedAgendaitems.push(EmberObject.create({
          left: currentLeft, right: currentRight,
        }));
        currentLeft = null;
        currentRight = null;
        continue;
      }

      if (this.addedAgendaitems.indexOf(currentRight.id) >= 0) {
        combinedAgendaitems.push(EmberObject.create({
          left: null,
          right: currentRight,
        }));
        currentRight = null;
        continue;
      }
      const foundLeftAgendaitem = this.findAgendaitemBySubcase(currentLeft, rightAgendaitems);

      if (!foundLeftAgendaitem) {
        combinedAgendaitems.push(EmberObject.create({
          left: currentLeft, right: null,
        }));
        currentLeft = null;
        continue;
      }

      const foundRightAgendaitem = this.findAgendaitemBySubcase(currentRight, leftAgendaitems);

      if (!foundRightAgendaitem) {
        combinedAgendaitems.push(EmberObject.create({
          left: null, right: currentRight,
        }));
        currentLeft = null;
        continue;
      }

      combinedAgendaitems.push(EmberObject.create({
        left: currentLeft, right: currentRight,
      }));
      currentLeft = null;
      currentRight = null;
    }
    return this.setCombinedGroupNames(combinedAgendaitems);
  }

  setCombinedGroupNames(list) {
    list.map((combinedAgendaitem) => {
      const leftGroupName = combinedAgendaitem.get('left.groupName');
      const rightGroupName = combinedAgendaitem.get('right.groupName');
      if (!leftGroupName && !rightGroupName) {
        return;
      }

      combinedAgendaitem.set('groupName', leftGroupName || rightGroupName);
    });
    return list;
  }

  findAgendaitemBySubcase(agendaitem, list) {
    return list.find((possibleMatch) => possibleMatch.get('agendaActivity.subcase.id') === agendaitem.get('agendaActivity.subcase.id'));
  }
}
