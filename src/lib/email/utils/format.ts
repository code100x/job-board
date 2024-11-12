interface Recipient {
    name?: string;
    email: string;
  }
  
  export const formatRecipients = {
    parseRecipient: (input: string): Recipient => {
      const matches = input.match(/^(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)$/);
      if (!matches) {
        return { email: input };
      }
      
      const [, name, email] = matches;
      return { name, email };
    },
  
    toString: (recipient: Recipient): string => {
      if (!recipient.name) {
        return recipient.email;
      }
      return `"${recipient.name}" <${recipient.email}>`;
    },
  
    formatList: (recipients: (string | Recipient)[]): string => {
      return recipients
        .map(recipient => {
          if (typeof recipient === 'string') {
            return formatRecipients.toString(formatRecipients.parseRecipient(recipient));
          }
          return formatRecipients.toString(recipient);
        })
        .join(', ');
    },
  
    // Parse a comma-separated string of email addresses
    parse: (input: string): Recipient[] => {
      if (!input) return [];
      
      return input
        .split(',')
        .map(part => part.trim())
        .filter(Boolean)
        .map(part => formatRecipients.parseRecipient(part));
    },
  
    // Validate and format a list of email addresses
    normalize: (input: string | string[] | Recipient | Recipient[]|undefined): string => {
      if (!input) return '';
  
      const recipients = Array.isArray(input) 
        ? input 
        : formatRecipients.parse(input.toString());
  
      return formatRecipients.formatList(recipients);
    }
  };