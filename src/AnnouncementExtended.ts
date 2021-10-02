import { Link, Announcement, UserLookup } from '@mauriora/controller-sharepoint-list';
import { Expose, Type } from 'class-transformer';

export class AnnouncementExtended extends Announcement {
    public constructor() {
        super();
    }

    @Expose({ name: 'Urgent' })
    public urgent: boolean = undefined;

    @Expose({ name: 'StartDate' })
    public startDate: string = undefined;

    @Type( () => Link )
    @Expose({name: 'URL'})
    public url: Link = undefined;

    @Type( () => UserLookup )
    @Expose({name: 'ReportOwner'})
    public contentOwner: UserLookup = undefined;
}
