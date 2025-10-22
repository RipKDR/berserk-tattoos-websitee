# 🌐 Hostinger DNS Configuration for Netlify

## Your Domain Information

**Domain:** www.berserk-tattoos.com
**Auth Code:** `%zB]0[=?DwVoh]bH`
**Registrar:** Hostinger

---

## 🎯 Two Options for DNS Setup

You have two options. **Option 1 is RECOMMENDED** as it's easier and more reliable.

---

## ✅ OPTION 1: Use Netlify DNS (RECOMMENDED)

This is the easiest and most reliable method. Netlify manages everything.

### Step 1: In Netlify Dashboard

1. **Go to your site** in Netlify Dashboard
2. Click: **"Domain settings"** → **"Set up Netlify DNS"**
3. Netlify will show you **4 nameservers** like:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   (Your actual nameservers might be different)

4. **Copy these 4 nameservers** - you'll need them for Hostinger

### Step 2: In Hostinger

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com
   - Use your credentials

2. **Navigate to Domains**
   - Click: **"Domains"** in the left menu
   - Find and click: **"www.berserk-tattoos.com"** (or berserk-tattoos.com)

3. **Change Nameservers**
   - Click: **"DNS / Nameservers"** tab
   - Scroll to: **"Change Nameservers"**
   - Select: **"I'll use my own nameservers"** or **"Use custom nameservers"**

4. **Enter Netlify Nameservers**
   - Enter all 4 nameservers from Netlify (one per field)
   - Example:
     ```
     Nameserver 1: dns1.p01.nsone.net
     Nameserver 2: dns2.p01.nsone.net
     Nameserver 3: dns3.p01.nsone.net
     Nameserver 4: dns4.p01.nsone.net
     ```

5. **Save Changes**
   - Click: **"Change Nameservers"** or **"Save"**
   - Confirm the change

### Step 3: Verify in Netlify

1. **Go back to Netlify**
2. Click: **"Verify"** or **"Check DNS configuration"**
3. Netlify will verify the nameservers (may take a few minutes)

### Step 4: Wait for Propagation

- **Typical time:** 5-30 minutes
- **Maximum time:** 24-48 hours
- **Check status:** https://dnschecker.org/#NS/berserk-tattoos.com

### ✅ That's it! Netlify will handle everything else including SSL.

---

## 🔧 OPTION 2: Use Hostinger DNS (Manual DNS Records)

Use this if you want to keep DNS management in Hostinger.

### Step 1: In Hostinger DNS Manager

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com

2. **Navigate to DNS Zone**
   - Click: **"Domains"** → **"www.berserk-tattoos.com"**
   - Click: **"DNS / Nameservers"**
   - Scroll to: **"DNS Records"** or **"Manage DNS Records"**

### Step 2: Delete Conflicting Records

**IMPORTANT:** Remove any existing A or CNAME records for:
- `@` (root domain)
- `www` subdomain

Look for records like:
```
Type: A, Name: @, Points to: [any IP]
Type: A, Name: www, Points to: [any IP]
Type: CNAME, Name: www, Points to: [anything]
```

Delete these records before adding new ones.

### Step 3: Add New DNS Records

Add the following records:

#### Record 1: Root Domain (A Record)
```
Type: A
Name: @ (or leave blank, or "berserk-tattoos.com")
Points to: 75.2.60.5
TTL: 3600 (or Auto)
```

#### Record 2: WWW Subdomain (CNAME Record)
```
Type: CNAME
Name: www
Points to: [your-site-name].netlify.app
TTL: 3600 (or Auto)
```

**Note:** Replace `[your-site-name]` with your actual Netlify site name.
Example: If your Netlify site is `berserk-tattoos.netlify.app`, use that.

### Step 4: Alternative - Both as A Records

If Hostinger doesn't allow CNAME for www, use A records for both:

```
Type: A
Name: @
Points to: 75.2.60.5
TTL: 3600

Type: A
Name: www
Points to: 75.2.60.5
TTL: 3600
```

### Step 5: Save and Wait

1. **Save all DNS changes**
2. **Wait for propagation:** 5-30 minutes (up to 24 hours)
3. **Check status:** https://dnschecker.org/#A/www.berserk-tattoos.com

### Step 6: Configure SSL in Netlify

1. **After DNS propagates**, go to Netlify Dashboard
2. Navigate to: **Domain settings** → **HTTPS**
3. Netlify will automatically provision SSL certificate
4. Wait 5-10 minutes for SSL activation

---

## 🔍 Verification Steps

### Check DNS Propagation

Visit: https://dnschecker.org

**For Option 1 (Netlify DNS):**
- Check type: **NS**
- Enter: `berserk-tattoos.com`
- Should show Netlify nameservers globally

**For Option 2 (A/CNAME Records):**
- Check type: **A**
- Enter: `www.berserk-tattoos.com`
- Should show: `75.2.60.5`

### Check Website is Live

1. **Visit your domain:** https://www.berserk-tattoos.com
2. **Check SSL:** Look for 🔒 padlock in browser
3. **Test redirects:**
   - http://www.berserk-tattoos.com → should redirect to https
   - http://berserk-tattoos.com → should redirect to https://www.berserk-tattoos.com

---

## ⏱️ Timeline

| Step | Time |
|------|------|
| Update DNS records in Hostinger | 2 minutes |
| DNS propagation starts | Immediately |
| DNS fully propagated | 5-30 minutes (up to 24 hours) |
| SSL certificate provisioning | 5-10 minutes after DNS |
| Total time (typical) | 15-45 minutes |
| Total time (maximum) | 24-48 hours |

---

## 🐛 Troubleshooting

### Domain not resolving after 30 minutes?

1. **Check DNS records in Hostinger:**
   - Verify records are correct
   - Ensure no typos in IP addresses or names
   - Check TTL is set (3600 is good)

2. **Check for conflicting records:**
   - Remove old A or CNAME records
   - Ensure only one A record for @
   - Ensure only one CNAME record for www

3. **Check nameservers (Option 1):**
   - Verify all 4 Netlify nameservers are entered correctly
   - No extra spaces or characters
   - Wait full 30 minutes minimum

4. **Use DNS checker:**
   - https://dnschecker.org
   - Check if some regions resolve correctly
   - Partial resolution = still propagating

### SSL certificate not working?

1. **Wait longer:** SSL requires DNS to be fully propagated
2. **In Netlify:**
   - Go to: **Domain settings** → **HTTPS**
   - Click: **"Verify DNS configuration"**
   - If issues, click: **"Renew certificate"**

3. **Check DNS:**
   - Must point to correct Netlify address
   - Must be fully propagated

### WWW vs non-WWW issues?

Netlify will handle redirects automatically if you configure both in Domain settings:
1. Add primary domain: `www.berserk-tattoos.com`
2. Add domain alias: `berserk-tattoos.com`
3. Set primary domain to www version

---

## 📋 Quick Reference Card

### Netlify DNS (Option 1)
```
1. Get 4 nameservers from Netlify
2. Update in Hostinger: Domains → DNS/Nameservers → Change Nameservers
3. Enter all 4 nameservers
4. Save and wait 5-30 minutes
```

### Manual DNS (Option 2)
```
Record 1 (A):
- Name: @
- Points to: 75.2.60.5

Record 2 (CNAME):
- Name: www
- Points to: [your-site].netlify.app
```

---

## ✅ Success Checklist

After DNS setup, verify:

- [ ] DNS resolves to Netlify: `nslookup www.berserk-tattoos.com`
- [ ] Website loads: https://www.berserk-tattoos.com
- [ ] SSL is active: 🔒 padlock shows in browser
- [ ] HTTP redirects to HTTPS
- [ ] Non-www redirects to www (or vice versa)
- [ ] All pages load correctly
- [ ] Images display properly

---

## 🎯 Support Resources

- **Hostinger DNS Help:** https://support.hostinger.com/en/articles/1583227-how-to-manage-dns-records
- **Netlify DNS Docs:** https://docs.netlify.com/domains-https/netlify-dns/
- **DNS Checker:** https://dnschecker.org
- **Hostinger Support:** Live chat in hPanel

---

**Last Updated:** October 21, 2025
**Domain:** www.berserk-tattoos.com
**Hosting:** Netlify
**Registrar:** Hostinger

---

*Remember: DNS changes can take time. Be patient and wait at least 30 minutes before troubleshooting.*
