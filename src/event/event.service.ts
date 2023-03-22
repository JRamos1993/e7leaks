import {Injectable} from "@nestjs/common";
import {join} from "path";
import moment = require("moment");
const fs = require('fs');

@Injectable()
export class EventService {
  public getOngoingEvents() {
    const data = JSON.parse(fs.readFileSync(join(__dirname, '..', '..', 'db', 'events.json'), 'utf8'));
    const events = {};
    for (const server of ['global', 'europe', 'asia']) {
      if (data[server] !== undefined) {
        events[server] = this.prepareServerEvents(data[server]);
      }
    }

    return events;
  }

  public getCurrentAlerts() {
    return JSON.parse(fs.readFileSync(join(__dirname, '..', '..', 'db', 'alerts.json'), 'utf8'));
  }

  private prepareServerEvents(data) {
    const events = [];
    data.forEach(rawEvent => {
      const event: any = { name: rawEvent.name, url: rawEvent.url };
      const start = moment(rawEvent.start);
      const end = moment(rawEvent.end);

      event.showDays = false;
      if (start > moment()) {
        event.target = start.format();
        event.type = 'in';
        event.style = 'danger';
        if (start.diff(moment(), 'hours') > 24) {
          event.showDays = true;
        }
        events.push(event);
      } else if (start < moment() && end > moment()) {
        event.target = end.format();
        event.type = 'ends in';
        event.style = 'success';
        if (end.diff(moment(), 'hours') > 24) {
          event.showDays = true;
        }
        events.push(event);
      }
    });
    return events;
  }
}