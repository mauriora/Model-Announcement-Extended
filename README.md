# Model-Announcement-Extended

Shared model of the standard Announcement (title, body, expires) extended with the properties urgent, start date, url and owner.

Contains the typescript model implementation and the sharepoint provisioning files.

## Sharepoint provisioning files

In [the sharepoint folder](./sharepoint) are the following provisioning files:

- [acknowledged-announcements-elements.xml](./sharepoint/acknowledged-announcements-elements.xml) list instance of the acknowledged announcements list. Install on one site per tenant.
- [acknowledged-announcements-schema.xml](./sharepoint/acknowledged-announcements-schema.xml) settings for the acknowledged announcements list.
- [announcements-extended-content-type-elements.xml](./sharepoint/announcements-extended-content-type-elements.xml) content type of the extended announcemnts. Install on one site per tenant.
- [announcements-extended-list-elements.xml](./sharepoint/announcements-extended-list-elements.xml) list instance of the announcements list. Install on one site per tenant, **if you don't want to use and extend and existing list**.
- [announcements-extended-schema.xml](./sharepoint/announcements-extended-schema.xml) settings for the announcements list.

## Typescript model

```typescript
import { AnnouncementExtended } from '@mauriora/model-announcement-extended';
import { getCreateByIdOrTitle } from '@mauriora/controller-sharepoint-list';

const newController = await getCreateByIdOrTitle(listName, siteUrl);

const now: string = new Date().toISOString();

const newModel = await newController.addModel(
    AnnouncementExtended,
    `(StartDate le datetime'${now}' or StartDate eq null) and ` + 
    `(Expires ge datetime'${now}' or Expires eq null)`
);
await newModel.loadAllRecords();

return <Stack>
    {newModel.records.map(announcement =>
        <StackItem key={`announcement-stack-item-${announcement.id}`}>
            <MessageBar
                messageBarType={(announcement.urgent ? MessageBarType.error : MessageBarType.warning)}
            >
            <Stack horizontal horizontalAlign='space-between'>
                <StackItem>
                    <Text variant='large'>{announcement.title}</Text>&nbsp;
                </StackItem>
                <StackItem>
                    <span
                        style={{ whiteSpace: 'normal' }}
                        dangerouslySetInnerHTML={{ __html: announcement.body }}
                    />
                </StackItem>
                {announcement.url &&
                    <StackItem>
                        <Link href={announcement.url.url} target="_blank">
                            {announcement.url.description ?? announcement.url.url}
                        </Link>
                    </StackItem>
                }
            </Stack>
            </MessageBar>
        </StackItem>
    )}
</Stack>;
```

